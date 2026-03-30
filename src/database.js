import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    this.#openDatabase()
      .then(() => {
        console.info('Database loaded successfully')
      }).catch(err => {
        console.error('Failed to open the database', err)
      })
  }

  async #openDatabase() {
    try {
      const data = await fs.readFile(databasePath, 'utf-8')
      this.#database = JSON.parse(data)
    } catch (err) {
      await this.#persist()
    } finally {
      return this.#database
    }
  }

  async #persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    await this.#persist()

    return data
  }

  async select(table, search) {
    await this.#openDatabase()
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

  async update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }

      await this.#persist()
    }

    return rowIndex
  }

  async delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      await this.#persist()
    }

    return rowIndex
  }
}