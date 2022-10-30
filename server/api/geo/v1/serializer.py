from rest_framework_gis import serializers

from ..models import WorldBorder


class GeoSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        # fields=('fips','area','region','subregion','lon','lat','geom')
        fields = "__all__"
        geo_field = "geom"
