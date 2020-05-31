<p align="center">
	<img src="https://cdn.discordapp.com/attachments/713498715658125363/716253680600350720/kannashell.png">
</p>
<strong><p align="center">Kanna is a small, light and great to use terminal shell for Windows.</p></strong>

Kanna is by default supposed to be a lightweight and quick shell that looks like other shells on Linux. It has custom prompts which provide variables for colors, username, hostname (computer name) and current working directory.

It is still being developed but is currently very usable.

# Screenshot
Here is me using Kanna while developing it.
![Preview](https://cdn.discordapp.com/attachments/713499232803225662/716259579327152148/kannashellusage.png)

# Documentation
Kanna will (and currently has) a wide range of things you can customize and other things.

## Config
A default `.kannaconf.json` file is provided with default values, which is located in your user folder. You can of course change this to your liking.  
  
`askOnExit` - Whether to ask for confirmation to exit with ctrl+c (Default: true)
### Colors
Colors are available for the `prompt` and `motd`. There are also other formatting options.
```
{reset}
{bold}
{italic}
{underline}
{strike} or {strikethrough}

{black}
{red}
{green}
{yellow}
{blue}
{magenta}
{cyan}
{white}
```

### Variables
Variables can be used in the `prompt` and `motd`.
```
%username% - The name of your user.
%hostname% - The name of the computer.
%cwd% - The current directory you are in.
%cwf% - Name of the folder you are currently in.
%ver% - ONLY FOR motd. Shows the version of Kanna.
```