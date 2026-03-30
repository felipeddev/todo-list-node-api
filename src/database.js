import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        console.log(`Search in ${table} for (${row['id']})\n`);

        const filteredData = Object.entries(search).some(([key, value]) => {
          console.log(`Searching term ${value} in ${table}' ${key} (${row[key]})`);

          const contains = row[key].toLowerCase().includes(value.toLowerCase())

          if (contains) {
            console.log(`Match`)
          } else {
            console.log(`Did not match`)
          }

          return contains
        })
        console.log(`\n--- ---\n`)
        return filteredData
      })

      return data
    }

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }

      this.#persist()
    }

    return rowIndex
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()
    }

    return rowIndex
  }
}