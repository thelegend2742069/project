# Generated by Django 5.2 on 2025-05-06 12:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='room_code',
            new_name='room',
        ),
        migrations.AddField(
            model_name='message',
            name='username',
            field=models.CharField(default='guest', max_length=30),
        ),
        migrations.AlterField(
            model_name='message',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
