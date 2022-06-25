import subprocess
import sys
import json

# python setup.py <args.json>


def parse_args(setup_args_filename):
    file = open(setup_args_filename)
    links = json.load(file)
    print("links: ")
    for key in links:
        print(links[key])
    return links


def agree_eula():
    EULA_FILE = "eula.txt"
    lines = open(EULA_FILE, 'r').readlines()
    lines[-1] = "eula=true"
    open(EULA_FILE, 'w').writelines(lines)


def start_server(server_filename):
    subprocess.run(["java", "-jar", server_filename])


def download(link, to="."):
    output = to
    if to == ".":
        output = "./" + link.rsplit('/', 1)[-1]
    subprocess.run(["wget", link, "-O", output])


def download_plugins(plugins):
    subprocess.run(["mkdir", "plugins"])
    for plugin in plugins.values():
        download(plugin['link'], "./plugins/"+plugin['filename'])


def set_worlds(worlds):
    for world in worlds.values():
        subprocess.run(["cp", "-R", world['path'], "./"+world['name']])


[setup, setup_args_filename] = sys.argv
args = parse_args(setup_args_filename)

paper = args['paper']
mv = args['mv']
worlds = args['worlds']

print(paper['filename'])
download(paper['link'])
start_server(paper['filename'])
agree_eula()
download_plugins(mv)
set_worlds(worlds)
# start_server(paper['filename'])
# set_ops()
# set_white_list()
# set_server_props()
