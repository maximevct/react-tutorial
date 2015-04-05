#!/bin/sh

sudo -u postgres psql cooloc < database/schema.sql
