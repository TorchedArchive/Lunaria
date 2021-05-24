This is the legacy version of Lunaria that is made in JavaScript with Node.js. For a new and cool shell made in Go, look at [Hilbish](https://github.com/Mewyuna/Hilbish)  

<strong>Lunaria is a simple, fast and lightweight terminal shell for Windows.</strong>

Its goal is to be quick and elegant, while also having the feel and look of a Linux shell.  
Lunaria provides: prompt and message of the day customization, extensibility (custom commands) and more to come.
</p>

# Screenshots
![](https://modeus.is-inside.me/4pQGrNHg.png)  
![](https://modeus.is-inside.me/C9zTGqWf.png)

# Installation
[A packaged binary is provided](https://github.com/Torchedgarbage/Lunaria/releases) if you don't have Node.js, or want easy usage.  
Otherwise:
```
git clone https://github.com/Luvella/Lunaria
cd Lunaria
npm link
```

## Tagged Overrides 
Running a command with `#` at the beginning will run the Windows provided version instead of Lunaria's custom implementation.  
Example: `ls` - This runs our implementation.  
`#ls` - would run Windows' normal `ls` command.

## Config
The config file is located in the `Lunaria` folder in your user folder (Example: `C:\Users\person\Lunaria`). The file is `conf.json`.  
This is also where custom commands can go, in the Commands directory (`C:\Users\person\Lunaria\Commands`)

#### Values for conf.json
`askOnExit` - Whether to ask for confirmation to exit with ctrl+c (Default: true)  
`prompt` - Your prompt (Default: ![](https://modeus.is-inside.me/9wdDPoyb.png))  
`motd` - The message showed when Lunaria is started (Default: ![](https://modeus.is-inside.me/0sNWdwhy.png))  

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
%ver% - Shows the version of Lunaria.
```
