# storing some useful commands only

# create coldline bucket
# gsutil mb -c coldline -l ASIA-EAST2 gs://mc-cuhk-server-backup
# gsutil mb -c coldline -l ASIA-EAST2 --retention 90d gs://mc-cuhk-server-minecraft-backup

# server init script...
# /opt/jdk-17/bin/java -Xmx4000M -Xms1024M -jar server.jar

# startInstance with token
# curl -X GET "https://asia-east2-mc-cuhk-server.cloudfunctions.net/startInstance" -H "Authorization:Bearer <token>"

# activate service account / auth
# gcloud auth activate-service-account --key-file $GOOGLE_APPLICATION_CREDENTIALS

# pm2 for nodejs daemon management
# pm2 monit index

# --- interactions ---
# view server log
# sudo journalctl -u minecraft -f

# send to server via socket
# echo "say hi" > /run/minecraft.stdin

#ssh
#gcloud compute ssh --project=mc-cuhk-server --zone=asia-east2-a mc-server-v1
