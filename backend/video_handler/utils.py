import os
import subprocess

def store_as_hls(input_path, title, username):

    output_dir = f'media/{username}/{title}'

    os.makedirs(output_dir, exist_ok=True)

    print(f'created directory {output_dir}')
    print('processing file...')

    command = ['ffmpeg', '-i', input_path, '-c:v', 'copy', '-c:a', 'copy', '-c:s', 'webvtt',
                '-f', 'hls', '-hls_time', '10', '-hls_list_size', '0', '-start_number', '0',
                '-hls_segment_filename', f'{output_dir}/segment_%03d.ts', f'{output_dir}/video.m3u8']
    
    result = subprocess.run(command)

    print(result.stdout)
    print('\n\nvideo processed')

    return f'{output_dir}/video.m3u8'