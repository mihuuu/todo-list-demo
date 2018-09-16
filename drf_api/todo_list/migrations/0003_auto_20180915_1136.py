# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0002_auto_20180915_1044'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='completed',
            new_name='finished',
        ),
    ]
