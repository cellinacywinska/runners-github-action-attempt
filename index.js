const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const configPath = core.getInput('pulumi-config-path');
  const pulumiGoal = core.getInput('pulumi-goal');
  const stackName = core.getInput('pulumi-stack-name');
  const cloudProvider = core.getInput('pulumi-cloud-provider');
  const cloudArch = core.getInput('cloud-architecture');

  console.log(`Path: ${configPath} ${pulumiGoal} ${stackName} ${cloudProvider} ${cloudArch}`);

  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

// output is a placeholder 
// define enumerated values 
// load the inputs
// validate pulumi goal and arch
// against the pulumi goal, then cloud arch
// all inputs validated --> then check if arm64 and gcp then error 


// branch 
// tags are copies of branches that are frozen