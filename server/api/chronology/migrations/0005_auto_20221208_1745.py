# Generated by Django 3.2.5 on 2022-12-08 17:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chronology', '0004_auto_20221203_1318'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='chronology_id',
            new_name='chronology',
        ),
        migrations.RemoveField(
            model_name='event',
            name='region_id',
        ),
        migrations.AddField(
            model_name='event',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chronology.userregion'),
        ),
    ]
