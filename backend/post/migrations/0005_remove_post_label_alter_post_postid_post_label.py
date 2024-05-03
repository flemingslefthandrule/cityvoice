# Generated by Django 5.0.3 on 2024-03-11 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_alter_post_postid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='label',
        ),
        migrations.AlterField(
            model_name='post',
            name='postid',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AddField(
            model_name='post',
            name='label',
            field=models.ManyToManyField(blank=True, null=True, to='post.label'),
        ),
    ]