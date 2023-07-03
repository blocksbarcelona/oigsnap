#!/bin/bash

#Aloha snapshots
node index.js 'https://www.alohaeos.com/tools/reliability#networkId=11&timeframeId=8&sort=rank&sortDir=asc' 1900 2600
node index.js 'https://www.alohaeos.com/tools/reliability#networkId=16&timeframeId=8&sort=rank&sortDir=asc' 1900 2600
node index.js 'https://www.alohaeos.com/tools/benchmarks#networkId=11&timeframeId=8&outliers=0' 1900 2600
node index.js 'https://www.alohaeos.com/tools/benchmarks#networkId=16&timeframeId=8&outliers=0' 1900 2600

