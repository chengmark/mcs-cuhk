const mc = require('minecraft-server-util')
const Compute = require('@google-cloud/compute')
const compute = new Compute()
const { exec } = require('child_process')

const VM_ZONE = 'asia-east2-a'
const VM_NAME = 'mc-server-v1'
const CHECK_INTERVAL = 1000 * 60 * 5 // in ms
const BACKUP_INTERVAL = 1000 * 60 * 30 // in ms
const THRESHOLD = 2
// const SERVER_IP = "0.tcp.ap.ngrok.io"
// const SERVER_IP = "CUHKMC.minehut.gg" // test server, 0 online
const SERVER_IP = 'localhost'

let idleCounter = 0
let lastBackupTime = 0

const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

const getPlayerNumber = async () => {
  return new Promise((resolve, reject) => {
    mc.status(SERVER_IP, { timeout: 7500 })
      .then((result) => {
        resolve(result.rawResponse.players.online)
      })
      .catch((err) => {
        console.log(err)
        resolve(-1)
      })
  })
}

const backupWorld = (callback) => {
  console.log('running backup')
  exec('sh backup.sh', (error, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    if (error !== null) {
      console.log(`exec error: ${error}`)
    } else {
      if (callback) callback()
    }
  })
}

const stopInstance = () => {
  const zone = compute.zone(VM_ZONE)
  const vm = zone.vm(VM_NAME)

  console.log('stopping instance')
  vm.stop(function (err, operation, apiResponse) {
    console.log({ err, operation, apiResponse })
    console.log('instance stop successfully')
  })
}

const mainLoop = async () => {
  while (true) {
    if ((await getPlayerNumber()) == 0) {
      console.log('server is empty')
      idleCounter++
    } else {
      console.log('server is not empty')
      idleCounter = 0
    }

    if (idleCounter >= THRESHOLD) {
      // backup and stop the VM
      backupWorld(stopInstance)
    } else {
      console.log('threshold not reached yet')
    }

    console.log(`last backup time: ${new Date(lastBackupTime).toISOString()}`)
    if (Date.now() - lastBackupTime > BACKUP_INTERVAL) {
      backupWorld(() => {
        lastBackupTime = Date.now()
      })
    }
    await sleep(CHECK_INTERVAL)
  }
}

mainLoop()
