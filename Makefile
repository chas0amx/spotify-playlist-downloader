SHELL := /bin/bash
PROJECT_NAME := my-project

# Load environment variables from .env file
include .env
export $(shell sed 's/=.*//' .env)


# Set the name of the Docker image
IMAGE_NAME := spotify-downloader

# Set the tag for the Docker image
IMAGE_TAG := latest

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

# Run the Docker container and download the playlist data
download:
	docker run \
		-e CLIENT_ID=$(CLIENT_ID) \
		-e CLIENT_SECRET=$(CLIENT_SECRET) \
		-e PLAYLIST_ID=$(PLAYLIST_ID) \
		-v $(PWD)/index.js:/app/index.js \
		$(IMAGE_NAME):$(IMAGE_TAG)

# Remove the Docker image
clean:
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG)

# Default goal
.DEFAULT_GOAL := download
