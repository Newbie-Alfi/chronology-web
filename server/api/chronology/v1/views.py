from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from ..models import Chronology, Event, Region, UserRegion
from .serializer import (
    UserRegionSerializer,
    ChronologySerializer,
    RegionSerializer,
    EventSerializer,
    TimelineSerializer,
)


class GeoPagination(PageNumberPagination):
    page_size = 3
    page_query_param = "page_size"
    max_page_size = 50


class RegionView(ReadOnlyModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = GeoPagination


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

        result = chronology_events.filter(date__lte=current_date)
        return result


class TimelineViewSet(ModelViewSet):
    serializer_class = TimelineSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        chronology_id = self.kwargs.get("chronology_id")
        chronology_events = (
            Event.objects.filter(chronology_id=chronology_id).order_by("date").values()
        )
        return chronology_events
