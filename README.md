Athena Civic VS
===============

** This repository is devoted for the modification of the Athena codebase via Visual Studio. **

[Athena](athenacivic.azurewebsites.net) is a web application for visualizing the civic technology space through an intuitive and interactive graphical network. Nodes represent the entities, which would consist of people and organizations, involved within this space, and the links represent the type of relationship/connection these entities share. 

Filtering options provide a unique method for visualizing certain aspects of the civic technology space.

|Type of Entities | Color Representation
|----------------|-----------------
|`For-Profit`|`Green`
|`Non-Profit`|`Blue`
|`Government`|`Red`
|`Individuals`|`Orange` 

|Type of Connections | Color Representation
|----------------|-----------------
|`Investing`|`Dark Green` 
|`Funding`|`Purple`
|`Collaboration`|`Yellow`
|`Affiliation`|`Pink`

Cloning the repository
------------

    git clone https://github.com/microsoftny/athena-civic-vs.git

Running on localhost
--------------------

Once the project is opened in Visual Studio and Node tools are installed, navigate to "Control Panel" -> "Programs and Features" -> "Turn Windows Features On or Off". Turn on IIS (Internet Information Services) to enable localhost capabilities on local machine. 

After building and running the project, Athena should be viewable from the following URL.

|Machine | URL
|------- | ---
|`Windows`| `localhost:1337`
