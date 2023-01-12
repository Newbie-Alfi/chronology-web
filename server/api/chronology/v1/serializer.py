from rest_framework_gis import serializers as gis_serializers
from rest_framework import serializers

from ..models import Chronology, Event, Region, UserRegion, RegionData


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
        fields = "__all__"
        # fields = (
        #     "id",
        #     "name",
        #     "description",
        #     "date",
        #     "end_date",
        #     "region_id",
        # )


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


class RegionDataSerializer(gis_serializers.GeoFeatureModelSerializer):
    name = serializers.CharField(source='user_region.name')
    description = serializers.CharField(source='user_region.description')
    region = gis_serializers.GeometryField(source='user_region.geom')

    class Meta:
        model = RegionData
        fields = ("id", "data", "region", "name", "description", "events")
        extra_kwargs = {'events': {'write_only': True}}
        geo_field = "region"


class EventDataSerializer(gis_serializers.GeoFeatureModelSerializer):
    id = serializers.CharField(source='region_data.user_region.id')
    event_id = serializers.CharField(source='id')
    reg_name = serializers.CharField(source='region_data.user_region.name')
    data = serializers.JSONField(
        source="region_data.data")  # type:ignore
    reg_description = serializers.CharField(
        source='region_data.user_region.description')
    region = gis_serializers.GeometryField(
        source='region_data.user_region.geom')

    class Meta:
        model = Event
        fields = ("id", "event_id", "reg_name", "reg_description",
                  "region", "name", "description", 'data')
        geo_field = "region"
