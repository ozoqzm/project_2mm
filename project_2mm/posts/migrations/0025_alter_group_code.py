# Generated by Django 4.2.4 on 2023-08-12 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0024_post_group_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='code',
            field=models.UUIDField(primary_key=True, serialize=False, unique=True, verbose_name='모임초대코드'),
        ),
    ]