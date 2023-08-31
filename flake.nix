{
  description = "Unidash";

   inputs = {
     nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
     utils.url = "github:numtide/flake-utils";
   };

   outputs = { self, nixpkgs, utils } @inputs:
     utils.lib.eachDefaultSystem (system:
       with import nixpkgs { inherit system; }; {
         devShells.default = mkShell {
           buildInputs = [
             nodejs-18_x
           ];
         };
       });
 }
