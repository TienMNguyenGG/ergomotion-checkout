#Install shopify cli
For Windows:​
Step 1: First, install Ruby+Devkit using RubyInstaller for Windows.​
Step 2: Using the  RubyGems.org package manager, install Shopify CLI. ​
Step 3: Open a new terminal, navigate the home directory, and run the "gem install shopify-cli" command.​
Step 4: To verify the installation, you need to run the "shopify version" command. ​


For macOS:​
Shopify CLI is available through either RubyGems.org or Homebrew.​
If you are using RubyGems.org, follow step 3 and step 4 to install and verify. ​
If you are using Homebrew, run the following commands "brew tap shopify/shopify" and "brew install shopify-cli" to install, and for verification, follow step 4. 


#Login Store
shopify login [--store <DOMAIN>]

#Start
shopify theme serve

#Watch Css/js
1.npm i
2.npx mix watch

#Build Production
npx mix --production