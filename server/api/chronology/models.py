from django.contrib.gis.db import models
from django.contrib.auth.models import User


class BaseRegion(models.Model):
    geom = models.GeometryField(srid=4326)
    description = models.TextField(null=True, blank=True)
    name = models.CharField(max_length=64)

    class Meta:
        abstract = True


class Region(BaseRegion, models.Model):
    def __str__(self):
        return self.name


class UserRegion(BaseRegion, models.Model):
    geom = models.GeometryField(srid=4326, blank=True, null=True)
    region = models.ForeignKey(
        Region, on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return self.name


class Style(models.Model):
    style = models.JSONField()
    name = models.CharField(max_length=64)
    user_region = models.ForeignKey(
        UserRegion, on_delete=models.CASCADE, blank=True, null=True
    )


class RegionData(models.Model):
    data = models.JSONField(blank=True, null=True)
    style = models.ForeignKey(
        Style, on_delete=models.CASCADE, blank=True, null=True)
    user_region = models.ForeignKey(
        UserRegion, on_delete=models.CASCADE, blank=True, null=True
    )


class Chronology(models.Model):
    name = models.CharField(max_length=64)
    img = models.ImageField(
        null=True, blank=True, upload_to="images/", verbose_name="Изображение"
    )
    description = models.CharField(max_length=255, null=True, blank=True)
    creation_date = models.DateTimeField(auto_now=True)
    activity_date = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)
    user = models.ForeignKey(
        User, verbose_name="Пользователь", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    event_data = models.JSONField(blank=True, null=True)
    region_data = models.ForeignKey(
        RegionData, on_delete=models.CASCADE, blank=True, null=True
    )
    chronology = models.ForeignKey(Chronology, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
