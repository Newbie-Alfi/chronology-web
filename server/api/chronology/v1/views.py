from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q

from ..models import Chronology, Event, Region, UserRegion
from .serializer import (
    UserRegionSerializer,
    ChronologySerializer,
    RegionSerializer,
    EventSerializer,
    TimelineSerializer,
)


class BasePagination(PageNumberPagination):
    page_size = 3
    page_query_param = "page_size"
    max_page_size = 50


class RegionView(ReadOnlyModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    pagination_class = BasePagination


class ChronologyView(ModelViewSet):
    queryset = Chronology.objects.all()
    serializer_class = ChronologySerializer
    permission_classes = (IsAuthenticated,)


class UserRegionView(ModelViewSet):
    queryset = UserRegion.objects.all()
    serializer_class = UserRegionSerializer
    permission_classes = (IsAuthenticated,)


class EventView(ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        chronology_id = self.kwargs.get("chronology_id")
        chronology_events = Event.objects.filter(chronology_id=chronology_id).order_by(
            "date"
        )
        current_date = self.request.query_params.get("current_date")

        if current_date == None:
            current_date = chronology_events.order_by("date")[0].date

        result = chronology_events.filter(
            Q(date__lte=current_date) & (Q(end_date__gte=current_date) | Q(end_date__isnull=True)))
        return result

    @swagger_auto_schema(method='get')
    @action(detail=False, methods=['get'], serializer_class=UserRegionSerializer)
    def get_regions(self, request, chronology_id):
        regionsId = self.get_queryset().exclude(
            region_id__isnull=True).values_list('region_id', flat=True)

        print(regionsId)
        regions = UserRegion.objects.filter(pk__in=regionsId).all()

        serializer = self.get_serializer(regions, many=True)

        return Response(serializer.data)


class TimelineViewSet(ModelViewSet):
    serializer_class = TimelineSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        chronology_id = self.kwargs.get("chronology_id")
        chronology_events = (
            Event.objects.filter(
                chronology_id=chronology_id).order_by("date").values()
        )
        return chronology_events
