#!/bin/bash

# Initial latitude
latitude1=24.919897878476
longitude1=91.82930635337908

latitude2=24.919897878476
longitude2=91.82930635337908
imei="1729"
busNumber="11"
busNumber="97"
timestamp="12:12"

# Run the command 60 times (every 1 second for 1 minute)
for i in {1..60}
do
  # Send the request with the updated latitude
  curl -X POST -H "Content-Type: application/json" \
       -d "{ \"imei\": \"$imei\", \"busNumber\": \"$busNumber\", \"latitude\":\"$latitude1\",\"longitude\":\"$longitude1\",\"timestamp\":\"$timestamp\"}" \
       https://imsourobh-bus.up.railway.app/update


  # Increment latitude
  latitude1=$(echo "$latitude1 + 0.00000001" | bc)

   # Send the request with the updated longitude
  curl -X POST -H "Content-Type: application/json" \
       -d "{ \"imei\": \"$imei\", \"busNumber\": \"$busNumber\", \"latitude\":\"$latitude2\",\"longitude\":\"$longitude2\",\"timestamp\":\"$timestamp\"}" \
       https://imsourobh-bus.up.railway.app/update


  # Increment latitude
  longitude2=$(echo "$longitude2 + 0.00000001" | bc)

  sleep 1  # Wait for 1 second before the next request
done

echo "Finished sending 60 requests."
