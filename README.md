# mc-cuhk-server
a CUHK minecraft survival server hosting on GCP

## Current Server Spec
- e2-medium (2 vCPUs, 4 GB memory) 
- Paper server 1.17.1
- Static external IP

## Dev Roadmap
- [X] auto stop instance if server idle for ~ 10 mins
- [X] cloud function to start VM instance (URL trigger)
- [X] world auto backup (per 30 mins)
- [ ] startInstance security
- [ ] server info(online status, host billing) website
- [ ] server info discord bot
- [ ] VM RAM auto scaling
- [ ] template for auto deployment


## Concerns
- Paper server has high RAM consumption
- Spigot server has slow chunk rendering speed
