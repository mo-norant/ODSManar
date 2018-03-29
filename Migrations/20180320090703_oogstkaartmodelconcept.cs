using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AngularSPAWebAPI.Migrations
{
    public partial class oogstkaartmodelconcept : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Concept",
                table: "OogstkaartItems",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "OnlineStatus",
                table: "OogstkaartItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Concept",
                table: "OogstkaartItems");

            migrationBuilder.DropColumn(
                name: "OnlineStatus",
                table: "OogstkaartItems");
        }
    }
}
