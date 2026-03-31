import fs from 'node:fs/promises'
import { parse } from 'csv-parse'
import { Readline } from 'node:readline/promises'
import readlinePromises from 'node:readline/promises'


async function uploadCSVFile(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8')

  const parsedFile = parse(fileContent)

  for await (const record of parsedFile) {
    const [title, description] = record
    // Skip header row
    if (title === 'title' && description === 'description') {
      continue
    }

    if (title && description) {
      const chunk = { title, description, source: 'csv-script' }
      const data = JSON.stringify(chunk)
      const buffer = Buffer.from(data)

      await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        body: buffer,
      }).then(response => {
        return response.text()
      }).then(data => {
        console.log(data)
      }).catch(err => {
        console.error('Failed to import CSV', err)
      })
    }
  }

  console.log('All records uploaded!');
}

console.log('Enter the file path which CSV file is located: ');

const readLine = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout
})

readLine.on('line', (line) => {
  const filePath = new URL(line.trim(), import.meta.url)
  if (line) {
    uploadCSVFile(filePath)
  } else {
    console.error('Invalid file path. Please try again.')
  }

  readLine.close()
})

// const filePath = new URL('../mock/tasks.csv', import.meta.url)
// await uploadCSVFile(filePath)