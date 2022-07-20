# Create/destroy runners action

This action creates and destroys the runners.

## Inputs: 

**Required inputs:**

pulumi-config-path: path to project's config (config.yaml) that Pulumi needs.

pulumi-goal: the name of the Pulumi goal. Supported values: create, destroy.

pulumi-stack-name: the name of the Pulumi cloud provider.

pulumi-cloud-provider: which cloud provider should be used to deploy resources

pulumi-config-passphrase: the passphrase that Pulumi will use to encrypt secrets.

cloud-architecture: supported architecture names: amd64 or arm64.

github-app-id: the ID of the app linked to you repo (see main repo docs for a better explanation).

github-app-private-key: The private key of the app linked to you repo (see main repo docs for a better explanation.


**Not required inputs:**

aws-access-key-id: an access key id linked to you AWS account.

aws-secret-access-key: the secret access key of aws key id you have insert.

aws-region: the AWS region you want to use, eg. eu-west-2.

google-credentials: Google cloud services credentials.

google-project: GCP project ID.

google-region: the google region.

pulumi-access-token:


Additionally, fail the workflow if arch == arm64 and provider == GCP.

## Outputs


## Example usage

