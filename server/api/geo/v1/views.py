from rest_framework.viewsets import ModelViewSet

from ..models import WorldBorder
from .serializer import GeoSerializer


class GeoView(ModelViewSet):
    queryset = WorldBorder.objects.all()
    serializer_class = GeoSerializer
