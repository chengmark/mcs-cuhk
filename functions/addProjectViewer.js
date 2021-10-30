const { google } = require('googleapis')
const cloudresourcemanager = google.cloudresourcemanager('v1')

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  })
  return await auth.getClient()
}

let authClient = null

async function getIamPolicy() {
  authClient = await authorize()
  const response = (
    await cloudresourcemanager.projects.getIamPolicy({
      resource_: 'mc-cuhk-server',
      auth: authClient
    })
  ).data
  return response
}

async function addProjectViewer(email) {
  if (!authClient) authClient = await authorize()
  const { bindings } = await getIamPolicy()
  bindings.push({
    role: 'roles/viewer',
    members: [`user:${email}`]
  })
  const response = (
    await cloudresourcemanager.projects.setIamPolicy({
      resource_: 'mc-cuhk-server',
      requestBody: {
        policy: {
          bindings: [...bindings]
        }
      },
      auth: authClient
    })
  ).data
  return response
}

exports.main = async (req, res) => {
  await addProjectViewer(req.query.email)
  let string = `You can view the bill <a style="color: #8a85ff !important" href="https://console.cloud.google.com/billing/012561-E2C061-B839EF?authuser=1&project=mc-cuhk-server">here</a> now.`
  if (req.query.lang == 'cn')
    string = `撳<a style="color: #8a85ff !important" href="https://console.cloud.google.com/billing/012561-E2C061-B839EF?authuser=1&project=mc-cuhk-server">呢到</a> 去Google Cloud睇吓張單.`
  res.status(200).send(`
    <div style="
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: #1c2025;
            color: white;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            display: flex;
    ">
      <div
        style="
          font-family: Roboto, sans-serif;
        "
      >
        ${string}
      </div>
    </div>
    `)
}
