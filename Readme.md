# Node.js file manager

## Description

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Commands

### Start

```bash
npm run start -- --username=your_username
```

### Finish

```bash
ctrl + c
```

```bash
.exit
```

### Navigation & working directory (nwd)

- Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)

```bash
up
```

- Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)

```bash
cd path_to_directory
```

- Print in console list of all files and folders in current directory

```bash
ls
```

### Basic operations with files
- Read file and print it's content in console:
    ```bash
    cat path_to_file
    ```
- Create empty file in current working directory:
     ```bash
     add new_file_name
     ```
- Rename file (content should remain unchanged):
  ```bash
  rn path_to_file new_filename
  ```
- Copy file (should be done using Readable and Writable streams):
  ```bash
  cp path_to_file path_to_new_directory
  ```
- Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable
  streams):
  ```bash
  mv path_to_file path_to_new_directory
  ```
- Delete file:
  ```bash
  rm path_to_file
  ```
### Operating system info
  - Get EOL (default system End-Of-Line) and print it to console
    ```bash
    os --EOL
    ```
  - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print
    it to console
    ```bash
    os --cpus
    ```
  - Get home directory and print it to console
    ```bash
    os --homedir
    ```
  - Get current *system user name* (Do not confuse with the username that is set when the application starts) and
    print it to console
    ```bash
    os --username
    ```
  - Get CPU architecture for which Node.js binary has compiled and print it to console
    ```bash
    os --architecture
    ```
  - Calculate hash for file and print it into console
    ```bash
    hash path_to_file
    ```
  - Compress file (using Brotli algorithm, should be done using Streams API)
    ```bash
    compress path_to_file path_to_destination
    ```
  - Decompress file (using Brotli algorithm, should be done using Streams API)
    ```bash
    decompress path_to_file path_to_destination
    ```  
    
