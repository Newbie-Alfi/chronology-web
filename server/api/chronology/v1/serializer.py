from rest_framework_gis import serializers as gis_serializers
from rest_framework import serializers

from ..models import Chronology, Event, Region, UserRegion


class RegionSerializer(gis_serializers.GeoFeatureModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"
        geo_field = "geom"


class ChronologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Chronology
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "description",
            "date",
            "end_date",
            "region_id",
        )


class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "date",
            "end_date",
        )


class UserRegionSerializer(gis_serializers.GeoFeatureModelSerializer):
    class Meta:
        model = UserRegion
        fields = "__all__"
        geo_field = "geom"
