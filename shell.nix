{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
    nodePackages_latest.pnpm
    yarn
  ];
}