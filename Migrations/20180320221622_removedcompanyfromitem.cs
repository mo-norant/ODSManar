using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AngularSPAWebAPI.Migrations
{
    public partial class removedcompanyfromitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OogstkaartItems_Companies_CompanyID",
                table: "OogstkaartItems");

            migrationBuilder.DropIndex(
                name: "IX_OogstkaartItems_CompanyID",
                table: "OogstkaartItems");

            migrationBuilder.DropColumn(
                name: "CompanyID",
                table: "OogstkaartItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyID",
                table: "OogstkaartItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OogstkaartItems_CompanyID",
                table: "OogstkaartItems",
                column: "CompanyID");

            migrationBuilder.AddForeignKey(
                name: "FK_OogstkaartItems_Companies_CompanyID",
                table: "OogstkaartItems",
                column: "CompanyID",
                principalTable: "Companies",
                principalColumn: "CompanyID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
