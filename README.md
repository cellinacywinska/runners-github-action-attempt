# Create/destroy runners action

This action creates and destroys the runners.

## Inputs

Think about which inputs should be given to the Action from a workflow. Suggested are: 
path to project's config  (config.yaml) that Pulumi needs
repo secrets that Pulumi needs (this will probably be a list of optional params depending on which cloud provider will be used)
which cloud provider  should be used to deploy resources
which arch should be used (amd64 or arm64)

Additionally, fail the workflow if arch == arm64 and provider == GCP.

## Outputs


## Example usage

