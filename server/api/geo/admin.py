from django.contrib.gis import admin as gis_admin
from django.contrib import admin
from .models import WorldBorder, Chronology, Region, Event

admin.site.register(WorldBorder, gis_admin.GeoModelAdmin)
admin.site.register(Chronology, admin.ModelAdmin)
admin.site.register(Region, admin.ModelAdmin)
admin.site.register(Event, admin.ModelAdmin)
