import React from 'react'
import { Integer } from 'Migration/ColumnTypes'
import { shallowRender, content } from 'test-utils'
import MigrationContent from 'Migration/MigrationContent.Component'
import TestUtils from 'react-addons-test-utils'
import Table from 'Migration/Table'

describe('(Component) Migration/MigrationContent', () => {
  let _component, _props, _rendered

  beforeEach(() => {
    _props = {
      migration: {
        tableName: 'users',
        isPivot: false,
        tableOne: new Table('one'),
        tableTwo: new Table('two'),
        columns: {
          primary: new Integer('primary', { name: 'id', incremental: true })
        }
      }
    }
  })

  it('Should render as <div> with a <pre> element', () => {
    _component = shallowRender(<MigrationContent {..._props} />)

    expect(_component.type).to.equal('div')
    expect(content(_component).type).to.equal('pre')
  })

  it('Should render correct migration content (non-pivot)', () => {
    const expectedContent =
`<?php

use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Database\\Migrations\\Migration;

class CreateUsersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users')
    }
}`

    _rendered = TestUtils.renderIntoDocument(<MigrationContent {..._props} />)

    const pre = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'pre')
    expect(pre.textContent).to.equal(expectedContent)
  })

  it('Should render correct migration content (pivot)', () => {
    _props.migration.isPivot = true

    const expectedContent =
`<?php

use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Database\\Migrations\\Migration;

class CreateOneTwoTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('one_two', function (Blueprint $table) {
            $table->integer('one_id')->unsigned()->index();
            $table->foreign('one_id')->references('id')->on('two')->onDelete('cascade');
            $table->integer('two_id')->unsigned()->index();
            $table->foreign('two_id')->references('id')->on('one')->onDelete('cascade');
            $table->primary(['one_id', 'two_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('one_two')
    }
}`

    _rendered = TestUtils.renderIntoDocument(<MigrationContent {..._props} />)

    const pre = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'pre')
    expect(pre.textContent).to.equal(expectedContent)
  })
})
