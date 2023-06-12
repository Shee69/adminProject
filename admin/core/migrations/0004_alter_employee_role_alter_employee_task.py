# Generated by Django 4.2.1 on 2023-06-12 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_employee_role_alter_employee_task'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.role'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.task'),
        ),
    ]
