---
layout: bt_wiki
title: Uploading a Blueprint
category: User Interface
publish: true
abstract: Blueprint packing & uploading guide
pageord: 100

terminology_link: reference-terminology.html
---
{%summary%} {{page.abstract}}{%endsummary%}


# Packaging a Blueprint

Cloudify's UI allows the user to upload a packaged TAR blueprint file to the manager.
The TAR file must include a folder containing the bluperint's resources along with a main blueprint file named `blueprint.yaml`.
Once the user has the blueprint folder ready with the main blueprint inside it, the user can create a blueprint TAR file by using the command line:

{% highlight bash %}
export COPYFILE_DISABLE=true
tar czf blueprint-name.tar.gz blueprint-folder/
{% endhighlight %}

* The `export` command will prevent unwanted hidden files from being packaged inside the TAR file (i.e .DS_Store on OSX environment)
* The file and folder names are customizable.

The output file of the tar command above will be `blueprint-name.tar.gz`.


# Uploading a Blueprint

Cloudify's UI allows the user to upload a packaged blueprint TAR file to the Cloudify Manager.
The upload blueprint button can be found in the "Blueprints" section in the UI:

![The blueprint upload button]({{ site.baseurl }}/guide/images/ui/ui_upload_blueprint_button.png)


Once the blueprint upload dialog appears, the user can select a blueprint TAR file from the filesystem by pressing the `+` button:

![The blueprint upload dialog]({{ site.baseurl }}/guide/images/ui/ui_upload_dialog.png)


After a blueprint TAR file is selected, the `Save` button will become available. The blueprint name is an optional field. The user can enter a custom blueprint name, or leave this input field blank & Cloudify will use the name defined in the blueprint YAML.

![The user can enter a custom blueprint name]({{ site.baseurl }}/guide/images/ui/ui_upload_dialog_with_name.png)


Once the `Save` button is clicked, the button will be grayed out until the blueprint file is fully uploaded to Cloudify. After the upload is done, the user will be redirected to the blueprint's page.