from django.contrib.gis import admin as gis_admin
from django.contrib import admin
from .models import UserRegion, Chronology, Region, RegionData, Event

admin.site.register(UserRegion, gis_admin.GeoModelAdmin)
admin.site.register(Chronology, admin.ModelAdmin)
admin.site.register(Region, gis_admin.GeoModelAdmin)
admin.site.register(Event, admin.ModelAdmin)
admin.site.register(RegionData, admin.ModelAdmin)
