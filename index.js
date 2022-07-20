const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs');
const wait = require('./wait');

try {
  // Get all the inputs needed
  const configPath = core.getInput('pulumi-config-path');
  const pulumiGoal = core.getInput('pulumi-goal');
  const stackName = core.getInput('pulumi-stack-name');
  const cloudProvider = core.getInput('pulumi-cloud-provider');
  const cloudArch = core.getInput('cloud-architecture');
  const appID=core.getInput('app-id'); 
  const appPrivateKey = core.getInput('app-private-key');
  const pulumiConfigPassphrase = core.getInput('pulumi-config-passphrase');
  const awsAccessKey = core.getInput('aws-access-key');
  const awsSecretAccessKey = core.getInput('aws-secret-access-key');
  const awsRegion = core.getInput('aws-region');
  
  // const pulumiAccessToken = core.getInput('pulumi-access-token');

  console.log(`Path: ${configPath} ${pulumiGoal} ${stackName} ${cloudProvider} ${cloudArch}`);

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  // Simple check on provider and arch, we don't support gcp with an arm64 arch
  // TODO: use enumerated values
  core.info("Checking the inputs...");
  if (!(provider.toLowerCase() == 'aws' || provider.toLowerCase() == 'gcp')) {
    core.setFailed("Wrong provider");
  } else if (!(arch.toLowerCase() == 'arm64' || arch.toLowerCase() == 'amd64')) {
    core.setFailed("Wrong arch");
  } else if (provider.toLowerCase() == 'gcp' && arch.toLowerCase() == 'arm64') {
    core.setFailed("GCP doesn't have arm machines");
  }
  core.info("Check passed!");

  // Clone the repo and install the dependencies
  core.info("Cloning the repo and installing the dependencies...");
  shell.exec(`git clone https://github.com/pavlovic-ivan/ephemeral-github-runner.git`);
  shell.cd(`ephemeral-github-runner`);
  shell.exec(`npm ci`);

  // Export the env variable we need in our environment
  core.info("Setting up env variables...");
  shell.env["APP_ID"]=appID;
  shell.env["APP_PRIVATE_KEY"]=appPrivateKey;
  shell.env["PULUMI_BACKEND_URL"]=pulumiBackend;
  shell.env["PULUMI_CONFIG_PASSPHRASE"]=pulumiConfigPassphrase;
  shell.env["AWS_ACCESS_KEY_ID"]=awsAccessKey;
  shell.env["AWS_SECRET_ACCESS_KEY"]=awsSecretAccessKey;
  shell.env["AWS_REGION"]=awsRegion;
  // Skip the update check 
  shell.env["PULUMI_SKIP_UPDATE_CHECK"]="true";
  shell.env["PULUMI_SKIP_CONFIRMATIONS"]="true";

  // shell.env["PULUMI_ACCESS_TOKEN"]=pulumiAccessToken;

  core.info("Deploying the runners...");
  shell.cd(`${provider}`);
  shell.exec(`pulumi stack init ${stackName}`);
  shell.exec(`pulumi update --diff --config-file ${configFile}`);
  core.info("Runners deployed!");

  core.info("Waiting some time");
  wait(1000);  

  core.info("Destroying the runners");
  shell.exec(`pulumi stack select ${stackName}`);
  shell.exec(`pulumi destroy --config-file ${configFile}`);
  shell.exec(`pulumi stack rm ${stackName}`);
  core.info("Job finished");
} catch (error) {
  core.setFailed(error.message);
}


