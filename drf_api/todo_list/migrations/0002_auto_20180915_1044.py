# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='id',
            field=models.CharField(primary_key=True, max_length=30, serialize=False),
        ),
    ]
