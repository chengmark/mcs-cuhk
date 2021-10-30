const http = require('http')
const Compute = require('@google-cloud/compute')
const compute = new Compute()

const VM_ZONE = 'asia-east2-a'
const VM_NAME = 'mc-server-v1'

const zone = compute.zone(VM_ZONE)
const vm = zone.vm(VM_NAME)
const fwname = 'minecraft-fw-rule-' + Math.floor(new Date() / 1000)

const getServerIp = async () => {
  return new Promise((resolve, reject) => {
    vm.getMetadata((err, metadata, apiResponse) => {
      console.log({ metadata })
      resolve(metadata.networkInterfaces[0].accessConfigs[0].natIP)
    })
  })
}

const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

const startInstance = () => {
  const zone = compute.zone(VM_ZONE)
  const vm = zone.vm(VM_NAME)
  console.log('about to start a VM')
  vm.start(function (err, operation, apiResponse) {
    console.log('instance start successfully')
  })
  console.log('the server is starting')
}

const createFirewall = (callerIp) => {
  // Set the Firewall configs
  const config = {
    protocols: { tcp: [25565] },
    ranges: [callerIp + '/32'],
    tags: ['minecraft-server']
  }
  function callback(err, firewall, operation, apiResponse) {}

  // Create the Firewall
  compute.createFirewall(fwname, config, callback)
}

exports.checkAndStartInstance = async function checkAndStartInstance(req, res) {
  const serverIp = await getServerIp()

  startInstance()

  while (!(await getServerIp())) {
    console.log('Server is not ready, waiting 1 second...')
    await sleep(1000)
    console.log('Checking server readiness again...')
  }

  console.log('the server is ready')

  // Record the function caller's IPv4 address
  console.log(JSON.stringify(req.headers))
  sourceIp = req.get('X-Forwarded-For')
  let callerIp = req.query.message || req.body.message || sourceIp

  createFirewall(callerIp)

  res
    .status(200)
    .send(
      'Minecraft Server is Starting, Please Wait for ~30 seconds. <br />' +
        'The IP address of the Minecraft server is: <b>' +
        serverIp +
        '<b /><br />Your IP address is ' +
        callerIp +
        '<br />A Firewall rule named ' +
        fwname +
        ' has been created for you.'
    )
}
