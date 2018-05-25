﻿// <auto-generated />
using AngularSPAWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace AngularSPAWebAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("AngularSPAWebAPI.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<int?>("CompanyID");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("SubscripedWithCompany");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("CompanyID");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Communication.Message", b =>
                {
                    b.Property<int>("MessageID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("MessageString");

                    b.Property<bool>("Opened");

                    b.Property<int?>("RequestID");

                    b.HasKey("MessageID");

                    b.HasIndex("RequestID");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Communication.Request", b =>
                {
                    b.Property<int>("RequestID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CompanyID");

                    b.Property<DateTime>("Create");

                    b.Property<string>("Name");

                    b.Property<int?>("OogstkaartItemID");

                    b.Property<string>("Status");

                    b.Property<bool>("UserViewed");

                    b.HasKey("RequestID");

                    b.HasIndex("CompanyID");

                    b.HasIndex("OogstkaartItemID");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Address", b =>
                {
                    b.Property<int>("AddressID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("Number");

                    b.Property<string>("Street");

                    b.Property<string>("Zipcode");

                    b.HasKey("AddressID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Afbeelding", b =>
                {
                    b.Property<int>("AfbeeldingID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Create");

                    b.Property<string>("Name");

                    b.Property<string>("Omschrijving");

                    b.Property<int?>("OogstkaartItemID");

                    b.Property<string>("URI");

                    b.HasKey("AfbeeldingID");

                    b.HasIndex("OogstkaartItemID");

                    b.ToTable("Afbeeldingen");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Company", b =>
                {
                    b.Property<int>("CompanyID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AddressID");

                    b.Property<string>("CompanyName");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Email");

                    b.Property<string>("Phone");

                    b.HasKey("CompanyID");

                    b.HasIndex("AddressID");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.File", b =>
                {
                    b.Property<int>("FileID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Create");

                    b.Property<string>("Name");

                    b.Property<string>("Omschrijving");

                    b.Property<int?>("OogstkaartItemID");

                    b.Property<string>("URI");

                    b.HasKey("FileID");

                    b.HasIndex("OogstkaartItemID");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Weight", b =>
                {
                    b.Property<int>("WeightID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Metric");

                    b.Property<float>("WeightX");

                    b.HasKey("WeightID");

                    b.ToTable("Weights");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Latitude");

                    b.Property<double>("Longtitude");

                    b.HasKey("LocationID");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem", b =>
                {
                    b.Property<int>("OogstkaartItemID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Artikelnaam");

                    b.Property<int?>("AvatarAfbeeldingID");

                    b.Property<string>("Category");

                    b.Property<string>("Concept");

                    b.Property<DateTime>("CreateDate");

                    b.Property<DateTime>("DatumBeschikbaar");

                    b.Property<int>("Hoeveelheid");

                    b.Property<string>("Jansenserie");

                    b.Property<int?>("LocationID");

                    b.Property<string>("Omschrijving");

                    b.Property<bool>("OnlineStatus");

                    b.Property<bool>("TransportInbegrepen");

                    b.Property<string>("UserID");

                    b.Property<int>("Views");

                    b.Property<float>("VraagPrijsPerEenheid");

                    b.Property<float>("VraagPrijsTotaal");

                    b.HasKey("OogstkaartItemID");

                    b.HasIndex("AvatarAfbeeldingID");

                    b.HasIndex("LocationID");

                    b.ToTable("OogstkaartItems");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.Specificatie", b =>
                {
                    b.Property<int>("SpecificatieID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("OogstkaartItemID");

                    b.Property<string>("SpecificatieEenheid");

                    b.Property<string>("SpecificatieOmschrijving");

                    b.Property<string>("SpecificatieSleutel");

                    b.Property<string>("SpecificatieValue");

                    b.HasKey("SpecificatieID");

                    b.HasIndex("OogstkaartItemID");

                    b.ToTable("Specificaties");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.ApplicationUser", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Communication.Message", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Communication.Request")
                        .WithMany("Messages")
                        .HasForeignKey("RequestID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Communication.Request", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyID");

                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem")
                        .WithMany("Requests")
                        .HasForeignKey("OogstkaartItemID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Afbeelding", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem")
                        .WithMany("Gallery")
                        .HasForeignKey("OogstkaartItemID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Company", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.File", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem")
                        .WithMany("Files")
                        .HasForeignKey("OogstkaartItemID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Afbeelding", "Avatar")
                        .WithMany()
                        .HasForeignKey("AvatarAfbeeldingID");

                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.Specificatie", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem")
                        .WithMany("Specificaties")
                        .HasForeignKey("OogstkaartItemID");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularSPAWebAPI.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
