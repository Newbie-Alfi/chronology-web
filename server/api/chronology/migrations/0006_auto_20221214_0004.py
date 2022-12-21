# Generated by Django 3.2.5 on 2022-12-14 00:04

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chronology', '0005_auto_20221208_1745'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='region',
        ),
        migrations.AddField(
            model_name='event',
            name='event_data',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userregion',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chronology.region'),
        ),
        migrations.AlterField(
            model_name='userregion',
            name='geom',
            field=django.contrib.gis.db.models.fields.GeometryField(blank=True, null=True, srid=4326),
        ),
        migrations.CreateModel(
            name='RegionData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.JSONField(blank=True, null=True)),
                ('user_region', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chronology.userregion')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='region_data',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chronology.regiondata'),
        ),
    ]