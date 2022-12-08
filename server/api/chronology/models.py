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
    def __str__(self):
        return self.name


class Chronology(models.Model):
    name = models.CharField(max_length=64)
    img = models.ImageField(
        null=True, blank=True, upload_to="images/", verbose_name="Изображение"
    )
    descrition = models.CharField(max_length=255, null=True, blank=True)
    creation_date = models.DateTimeField(auto_now=True)
    activity_date = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)
    user = models.ForeignKey(
        User, verbose_name="Пользователь", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name + " " + self.creation_date.strftime("%d.%m %H:%M")


class Event(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    region = models.ForeignKey(
        UserRegion, on_delete=models.CASCADE, blank=True, null=True
    )
    chronology = models.ForeignKey(Chronology, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
