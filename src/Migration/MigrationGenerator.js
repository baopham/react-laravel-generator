import toTitleCase from 'titlecase'
import inflection from 'inflection'

export default class MigrationGenerator {
  constructor (migration) {
    this.migration = migration
  }

  getForeignFields () {
    const { tableOne, tableTwo } = this.migration

    const fields = []
    fields.push(`$table->integer('${tableOne.name}_id')->unsigned()->index();`)
    fields.push(`$table->foreign('${tableOne.name}_id')->references('${tableTwo.primaryKey}')->on('${tableTwo.name}')->onDelete('cascade');`)
    fields.push(`$table->integer('${tableTwo.name}_id')->unsigned()->index();`)
    fields.push(`$table->foreign('${tableTwo.name}_id')->references('${tableOne.primaryKey}')->on('${tableOne.name}')->onDelete('cascade');`)
    fields.push(`$table->primary(['${tableOne.name}_id', '${tableTwo.name}_id']);`)
    return fields
  }

  getSortedPivotTableNames () {
    return [
      this.migration.tableOne.name,
      this.migration.tableTwo.name
    ].sort()
  }

  getClassName () {
    const migration = this.migration

    if (migration.isPivot) {
      const [ tableOne, tableTwo ] = this.getSortedPivotTableNames(migration).map(name => inflection.singularize(name))

      return `Create${toTitleCase(tableOne)}${toTitleCase(tableTwo)}Table`
    }

    return `Create${toTitleCase(migration.tableName)}Table`
  }

  getTableName () {
    const migration = this.migration

    if (migration.isPivot) {
      return this.getSortedPivotTableNames(migration).map(name => inflection.singularize(name)).join('_')
    }

    return migration.tableName
  }

  getTableFields (indentLevel) {
    let fields

    const migration = this.migration

    let fieldIndent = `    `.repeat(indentLevel)

    if (!migration.isPivot) {
      fields = Object.keys(migration.columns).map((id) => {
        return `$table->${migration.columns[id].laravelMethods};`
      })
      fields.push(`$table->timestamps();`)
    } else {
      fields = this.getForeignFields()
    }

    return fields.join(`\n${fieldIndent}`)
  }

  getContent () {
    const fieldIndentLevel = 3

    const tableFields = this.getTableFields(fieldIndentLevel)

    const className = this.getClassName()

    const tableName = this.getTableName()

    const content =
`<?php

use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Database\\Migrations\\Migration;

class ${className} extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('${tableName}', function (Blueprint $table) {
            ${tableFields}
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('${tableName}')
    }
}`

    return content
  }
}
