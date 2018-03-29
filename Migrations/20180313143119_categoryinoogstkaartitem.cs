using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AngularSPAWebAPI.Migrations
{
    public partial class categoryinoogstkaartitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AfbeeldingURL",
                table: "OogstkaartItems",
                newName: "Category");

            migrationBuilder.CreateTable(
                name: "AfbeeldingsURLs",
                columns: table => new
                {
                    AfbeeldingsURLID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AfbeeldingsURLstring = table.Column<string>(nullable: true),
                    OogstkaartItemID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AfbeeldingsURLs", x => x.AfbeeldingsURLID);
                    table.ForeignKey(
                        name: "FK_AfbeeldingsURLs_OogstkaartItems_OogstkaartItemID",
                        column: x => x.OogstkaartItemID,
                        principalTable: "OogstkaartItems",
                        principalColumn: "OogstkaartItemID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AfbeeldingsURLs_OogstkaartItemID",
                table: "AfbeeldingsURLs",
                column: "OogstkaartItemID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AfbeeldingsURLs");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "OogstkaartItems",
                newName: "AfbeeldingURL");
        }
    }
}
