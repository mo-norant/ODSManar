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
    [Migration("20180329224608_viewsinitems")]
    partial class viewsinitems
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.AfbeeldingsURL", b =>
                {
                    b.Property<int>("AfbeeldingsURLID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AfbeeldingsURLstring");

                    b.Property<int?>("OogstkaartItemID");

                    b.HasKey("AfbeeldingsURLID");

                    b.HasIndex("OogstkaartItemID");

                    b.ToTable("AfbeeldingsURLs");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Company", b =>
                {
                    b.Property<int>("CompanyID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AddressID");

                    b.Property<string>("CompanyName");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Phone");

                    b.HasKey("CompanyID");

                    b.HasIndex("AddressID");

                    b.ToTable("Companies");
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

                    b.Property<string>("Afmetingen");

                    b.Property<string>("Artikelnaam");

                    b.Property<string>("Category");

                    b.Property<string>("Coating");

                    b.Property<string>("Concept");

                    b.Property<DateTime>("CreateDate");

                    b.Property<DateTime>("DatumBeschikbaar");

                    b.Property<string>("Glassamenstelling");

                    b.Property<int>("Hoeveelheid");

                    b.Property<string>("Jansenserie");

                    b.Property<int?>("LocationID");

                    b.Property<string>("Omschrijving");

                    b.Property<bool>("OnlineStatus");

                    b.Property<string>("Status");

                    b.Property<bool>("TransportInbegrepen");

                    b.Property<string>("UserID");

                    b.Property<int>("Views");

                    b.Property<float>("VraagPrijsPerEenheid");

                    b.Property<float>("VraagPrijsTotaal");

                    b.Property<int?>("WeightID");

                    b.HasKey("OogstkaartItemID");

                    b.HasIndex("LocationID");

                    b.HasIndex("WeightID");

                    b.ToTable("OogstkaartItems");
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

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.AfbeeldingsURL", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem")
                        .WithMany("AfbeeldingenURLs")
                        .HasForeignKey("OogstkaartItemID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.General.Company", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID");
                });

            modelBuilder.Entity("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.OogstkaartItem", b =>
                {
                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID");

                    b.HasOne("AngularSPAWebAPI.Models.DatabaseModels.General.Weight", "Weight")
                        .WithMany()
                        .HasForeignKey("WeightID");
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
