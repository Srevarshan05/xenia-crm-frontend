import sys

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_index = 1357 - 1
end_index = 1677 - 1

if lines[start_index].strip().startswith('<div className="split-pane"') and lines[end_index].strip() == ')}':
    del lines[start_index:end_index+1]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print('Deleted redundant split-pane block successfully.')
else:
    print('Lines did not match expected start/end. Start:', repr(lines[start_index][:50]), 'End:', repr(lines[end_index].strip()))
    sys.exit(1)
