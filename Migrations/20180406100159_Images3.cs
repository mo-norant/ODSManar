using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AngularSPAWebAPI.Migrations
{
    public partial class Images3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvatarImageID",
                table: "OogstkaartItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OogstkaartItems_AvatarImageID",
                table: "OogstkaartItems",
                column: "AvatarImageID");

            migrationBuilder.AddForeignKey(
                name: "FK_OogstkaartItems_Images_AvatarImageID",
                table: "OogstkaartItems",
                column: "AvatarImageID",
                principalTable: "Images",
                principalColumn: "ImageID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OogstkaartItems_Images_AvatarImageID",
                table: "OogstkaartItems");

            migrationBuilder.DropIndex(
                name: "IX_OogstkaartItems_AvatarImageID",
                table: "OogstkaartItems");

            migrationBuilder.DropColumn(
                name: "AvatarImageID",
                table: "OogstkaartItems");
        }
    }
}
