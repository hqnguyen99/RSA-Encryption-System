# Build image
FROM golang:1.15 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the dependencies file to the working directory
COPY cryptography.go /usr/src/app/cryptography.go

# Build
RUN go build -o /usr/src/app/cryptography.so -buildmode=c-shared /usr/src/app/cryptography.go

# Base image
FROM python:3.8-slim

# Create python user
RUN addgroup --gid 1000 python \
  && adduser --home /home/python --shell /usr/sbin/nologin --uid 1000 --gid 1000 --gecos 'Python' --disabled-password --disabled-login python

# Set the working directory in the container
WORKDIR /usr/src/app

# Using python user
USER python

# Copy the dependencies file to the working directory
COPY --chown=1000:1000 requirements.txt .

# Install dependencies
RUN pip install --user -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY --chown=1000:1000 --from=builder /usr/src/app/cryptography.so /usr/src/app/cryptography.so
COPY --chown=1000:1000 app.py /usr/src/app/app.py

# Command to run on container start
CMD ["python", "-u", "/usr/src/app/app.py"]